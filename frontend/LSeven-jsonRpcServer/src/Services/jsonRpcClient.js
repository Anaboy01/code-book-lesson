export class JsonRpcClient {
  constructor(url = '/rpc') {
    this.url = url
    this.id = 0
  }

  async call(method, params = []) {
    const request = {
      jsonrpc: '2.0',
      id: ++this.id,
      method,
      params,
    }

    const response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error.message)
    }

    return data.result
  }
}

export const rpc = new JsonRpcClient('/rpc')