export async function fetchNui<T = any>(eventName: string, data?: any, mockData?: T): Promise<T> {
  const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : 'peak-pedmanager';

  if (process.env.NODE_ENV === 'development' || !(window as any).GetParentResourceName) {
    if (mockData) return mockData;
    return {} as T;
  }

  const resp = await fetch(`https://${resourceName}/${eventName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data || {}),
  });

  return await resp.json();
}
