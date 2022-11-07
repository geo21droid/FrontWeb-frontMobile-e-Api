
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()




async function main() {
    const user = await prisma.user.create({
        data: {
           name: 'geovane dias',
           email: 'geo.des@mail.com',
           avatarUrl: 'https://github.com/diego3g.png',
        }
    })
    const users = await prisma.user.findMany()

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user,

            participants: {
                create: {
                    userId: user.id
                }
            }

        }
    })

    await prisma.game.create({
        data: {
          date: '2022-18-31T14:03:53.201Z ',
          firsTeamCountryCode: 'DE',
          secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-18-31T14:03:53.201Z ',
            firsTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

          guesses: {
            create: {
                firstTeamPoints:2,
                secondTeamPoints:1,

                participant: {
                    connect: {
                        userId_poolId: {
                            userId: user.id,
                            poolId: pool.id
                        }
                    }
                }
            }
          }

        }
    })

}


main()