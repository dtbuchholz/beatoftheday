# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

desmond = User.create(email: 'desmond17@protonmail.com', password: 'password')
desmond = User.create(email: 'ammad.fareed303@gmail.com', password: 'ammad303')
AdminUser.create(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
AdminUser.create(email: 'desmond17@protonmail.com', password: 'A1poopsauce', password_confirmation: 'A1poopsauce')
AdminUser.create(email: 'ammad.fareed786@gmail.com', password: 'ammad786', password_confirmation: 'ammad786')