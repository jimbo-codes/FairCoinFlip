class UsersController < ApplicationController
  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/ (temp removed this -> walletString)
  def show
    # debugger
    user = User.find_by_wallet(params[:wallet])
    puts user
    # This probably belongs in the login section, not here.
    # session[:user_id] = @user.id
    render json: user, status: 201
  end

  def show2
    user = User.find_by_wallet(params[:wallet])
    puts user
    # This probably belongs in the login section, not here.
    # session[:user_id] = @user.id
    render json: user, status: 201
  end

end
