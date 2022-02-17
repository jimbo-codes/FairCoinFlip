class UsersController < ApplicationController
  # rescue_from ActiveRecord::RecordNotFound :with
    # Idk syntax for the rescuefrom ^

  # GET /users
  def index
    @users = User.all
    @users = @users.order(funBal: :desc)
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
  def update #THIS FUNCTION ERRORS RANDOMLY - I'm not sure why.
    # Is this secure? Idts. Should probably use sessions here.
    params[:wallet] = params[:wallet].downcase
    user= User.find_by_wallet(params[:wallet])
    params[:balance] = params[:balance].to_f
    if(user[:balance] === params[:balance].to_f)
      render json: user, status: 200
    else
    user[:balance] = params[:balance].to_f
    user.save
    render json: user, status: 200
  end

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
