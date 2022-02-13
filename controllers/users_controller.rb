class UsersController < ApplicationController
  # rescue_from ActiveRecord::RecordNotFound :with
    # Idk syntax for the rescuefrom ^

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # POST /users
  def create
  # debugger
  user = User.create(wallet: params[:wallet], balance: params[:balance])
  render json: user, status: 200
  end


# GET / Create /users/wallet
def show
  params[:wallet] = params[:wallet].downcase
  user = User.find_by_wallet(params[:wallet])
  if user
    # Is there any value to setting your session id = user id?
    render json: user, status: 201
  else
    render json: {error: "The user doesn't yet exist"}
  end
  # Could also rescue from here instead

  # This probably belongs in the login section, not here.
  # session[:user_id] = @user.id
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
    # How to track user winstreak
    # A loop that goes to -> user.first.games.last.result to see if outcome == win
    
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
