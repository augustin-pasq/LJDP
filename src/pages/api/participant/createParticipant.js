import prisma from "../../../../lib/prisma"

export default async function createParticipant(req, res) {
    try {
        const game = await prisma.game.findUnique({
            where: {
                accessCode: req.body.accessCode,
            }
        })

        const participant = await prisma.participant.findUnique({
            where: {
                game_user: {game: game.id, user: req.body.user}
            },
        })

        if(participant === null) {
            await prisma.participant.create({
                data: {
                    game: game.id,
                    user: req.body.user,
                    score: 0,
                    hasJoined: true,
                    hasPhotos: false
                }
            })
        } else {
            await prisma.participant.update({
                where: {
                    game_user: {game: game.id, user: req.body.user}
                },
                data: {
                    hasJoined: true
                }
            })
        }

        const user = await prisma.user.findUnique({
            select: {
                id: true,
                username: true,
                profilePicture: true
            },
            where: {
                id: req.body.user
            }
        })

        res.status(200).json({content: {game: game, user: user}})
    } catch (err) {
        res.status(500).json(err)
    }
}