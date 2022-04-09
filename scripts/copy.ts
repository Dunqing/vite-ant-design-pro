import path from 'path'

import copy from 'recursive-copy'

const CopyFolderPath = path.join(__dirname, '..', 'src/layout')
const DestPath = path.join(__dirname, '..', 'dist/layout')

copy(CopyFolderPath, DestPath)
