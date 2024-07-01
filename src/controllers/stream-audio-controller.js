import ytstream from 'yt-stream'


export default async function streamAudio (req, res) {

    try {

        const {id} = req.query

        if(!id) return res.json({
            success:false,
            result:'voçe precisa passar o id da musica !'
        })

        console.log('new music requested !',new Date().getMinutes() + ':'+new Date().getSeconds())

        const stream = await ytstream.stream(`https://www.youtube.com/watch?v=${id}`, {
            quality: 'high',
            type: 'audio',
            highWaterMark: 1048576 * 32,
            download: true
        });

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // stream.stream.pipe(res);
        res.json({
            success:true,
            result:stream?.url
        })

        console.log(stream.url, '\n\n\n');
        
    } catch (err) {
        console.error('error ',err);
        res.status(500).send('Erro interno do servidor');
    }
}