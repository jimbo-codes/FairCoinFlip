# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_11_012017) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "fun_games", force: :cascade do |t|
    t.boolean "call"
    t.float "wagerAmount"
    t.float "wagerResult"
    t.boolean "flipResult"
    t.boolean "funUserWin"
    t.integer "funUserStreak"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "games", force: :cascade do |t|
    t.boolean "call"
    t.float "wagerAmount"
    t.integer "user_id"
    t.float "wagerResult"
    t.boolean "flipResult"
    t.boolean "userWin"
    t.integer "userStreak"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "wallet"
    t.float "balance"
    t.string "nickname"
    t.float "funBal", default: 10.0
    t.integer "funStreak", default: 0
    t.integer "winStreak", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
