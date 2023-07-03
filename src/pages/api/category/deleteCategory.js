import prisma from "../../../../lib/prisma"

export default async function handle(req, res) {
    let results = {"success" : undefined, content : []}

    try {
        results.content = await prisma.category.delete({
            where: {
                id: req.body.id,
            },
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