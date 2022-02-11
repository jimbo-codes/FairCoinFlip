# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# puts('seeding user')
User.create(wallet: "0xaea01704d80288fa97b0de0bc0758d5d2b0b81e1", balance: 5.00, winStreak: 0)
# puts('seeding game')
# Game.create(call: "false", wagerAmount: 0.25, user_id: 1)
# puts('seeding result')
# Result.create(wagerResult: 0.5, flipResult: false, win: true, game_id: 1)

puts 'done seeding, m8'