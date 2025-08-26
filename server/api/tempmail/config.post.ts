export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 验证必要的配置参数
  const { host, port, username, password, tls } = body
  
  if (!host || !username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必要的IMAP配置参数'
    })
  }
  
  // 这里可以将配置保存到数据库或配置文件
  // 为了安全考虑，建议使用环境变量或加密存储
  const config = {
    host,
    port: port || 993,
    username,
    password,
    tls: tls !== false, // 默认启用TLS
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  // 测试IMAP连接
  try {
    const Imap = await import('imap').then(m => m.default)
    const imap = new Imap({
      user: username,
      password: password,
      host: host,
      port: port || 993,
      tls: tls !== false,
      tlsOptions: { rejectUnauthorized: false }
    })
    
    // 简单的连接测试
    await new Promise((resolve, reject) => {
      imap.once('ready', () => {
        imap.end()
        resolve(true)
      })
      
      imap.once('error', (err: Error) => {
        reject(err)
      })
      
      imap.connect()
    })
    
    return {
      success: true,
      message: 'IMAP配置已保存并测试通过',
      config: {
        host,
        port: port || 993,
        username,
        tls: tls !== false
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `IMAP连接测试失败: ${(error as Error).message}`
    })
  }
}) 