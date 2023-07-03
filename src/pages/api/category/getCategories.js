import prisma from "../../../../lib/prisma"

export default async function handle(req, res) {
    let results = {"success" : undefined, content : []}

    try {
        let game = await prisma.game.findFirst({
            where: {
                accessCode: req.body.accessCode,
            }
        })

        results.content = await prisma.category.findMany({
            select: {
                id: true,
                title: true,
                type: true
            },
            where: {
                game: game.id
            }
        })

        results.success = true

        res.status(200)
    } catch (e) {
        results.success = false
        results.content = e

        res.status(500)
    }

    res.json(results)
}