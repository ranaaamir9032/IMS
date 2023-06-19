export const jwtCredentials = {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '30d'
    }
}