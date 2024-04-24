import express from 'express'
import Jimp from 'jimp'
import { nanoid } from 'nanoid'

const __dirname = import.meta.dirname;

const app = express()
app.use(express.static(__dirname + '/public'))

app.get('/image', async (req, res) => {

    const image_url = req.query.image_url

    const image = await Jimp.read(image_url)
    const buffer = await image
        .resize(350, Jimp.AUTO)
        .grayscale()
        .quality(60)
        .getBufferAsync(Jimp.MIME_JPEG)

    const dirname = __dirname + `/public/img/image-${nanoid().slice(15)}.jpeg`
    await image.writeAsync(dirname)

    res.set("Content-Type", "image/jpeg")
    return res.send(buffer)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor andando en http://localhost:${PORT}`)
})