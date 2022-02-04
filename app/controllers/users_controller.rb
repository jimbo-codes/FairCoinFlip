class UsersController < ApplicationController
  # GET /users
  def index
    @users = User.all
    render json: @users
  end

# GET /users/wallet
def show
  user = User.find_by_wallet(params[:wallet])
  puts user
  # This probably belongs in the login section, not here.
  # session[:user_id] = @user.id
  render json: user, status: 201
end

 # PATCH /users/1
  def update
    user= User.find_by_id(params[:user_id])
    if params[:outcome]
      wagerResult = params[:wagerAmount]*2
    elsif !params[:outcome]
      wagerResult = -params[:wagerAmount]
    end
    user[:balance] += wagerResult
    user.save
    render json:user, status:200
  end

private
# def user_params
  # # GET /users/ (temp removed this -> walletString)
  # def show
  #   # debugger
  #   user = User.find_by_wallet(params[:wallet])
  #   puts user
  #   # This probably belongs in the login section, not here.
  #   # session[:user_id] = @user.id
  #   render json: user, status: 201
  # end
  

end
