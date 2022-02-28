class ApplicationController < ActionController::Base
    include ActionController::Cookies
    protect_from_forgery
    # skip_before_action :verify_authenticity_token
    
    
    # Attempted Solutions for CSRF issues:
    # protect_from_forgery
    # after_action :set_csrf_cookie
    # after_action :set_csrf_cookie

    # after_action :set_csrf_cookie
    
    #   protected
    
    #     def set_csrf_cookie
    #       cookies["X-CSRF-Token"] = form_authenticity_token
    #     end
#     private
#   def set_csrf_cookie
#     # I'm sure this is a potential security risk somehow. Look into it?
    # cookies["CSRF-TOKEN"] = {
    #   value: form_authenticity_token,
    #   secure: true,
    #   same_site: :strict,
    #   domain: 'http://localhost:3001/'
    # }
#   end



# THIS GOES IN A cookies.js file:
# function CSRFToken(cookies) {
#     console.log(cookies);
#     const splitCookies = cookies.split('; ');
#     return splitCookies.find(cookie => cookie.startsWith("CSRF-TOKEN=")).split('=')[1];
#   }
#   export default CSRFToken;
end
