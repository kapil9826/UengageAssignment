import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const path = req.query.path as string[];
  const apiPath = path ? path.join('/') : '';

  if (!apiPath) {
    res.status(400).json({ error: 'API path is required' });
    return;
  }

  try {
    const baseUrl = 'https://jsonplaceholder.org';
    const url = new URL(`/${apiPath}`, baseUrl);
    
    // Preserve query parameters from the original request
    if (req.query) {
      Object.entries(req.query).forEach(([key, value]) => {
        if (key !== 'path' && value) {
          url.searchParams.append(key, Array.isArray(value) ? value.join(',') : String(value));
        }
      });
    }

    const fetchOptions: RequestInit = {
      method: req.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization as string,
        }),
      },
    };

    if (req.body && (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH')) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(url.toString(), fetchOptions);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    // Forward status and headers
    res.status(response.status);
    
    // Copy relevant headers
    const headersToForward = ['content-type', 'cache-control'];
    headersToForward.forEach(header => {
      const value = response.headers.get(header);
      if (value) {
        res.setHeader(header, value);
      }
    });
    
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from API',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

