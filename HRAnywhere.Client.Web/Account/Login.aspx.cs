using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using HRAnywhere.Model;
using HRAnywhere.Client.Web.Utils;

namespace HRAnywhere.Client.Web.Account
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            var membership = new Membership.UserMembershipProvider();
            if (membership.ValidateUser(txtUserName.Text, txtPasssword.Text))
            {
                FormsAuthentication.SetAuthCookie(txtUserName.Text, cbRememberMe.Checked);
                Helpers.UserName = txtUserName.Text;
                Helpers.Password = txtPasssword.Text;
                Helpers.SetOnline(true);
                FormsAuthentication.RedirectFromLoginPage(txtUserName.Text, cbRememberMe.Checked);
            } 
            else
            {
                CustomValidator1.ErrorMessage = "نام کاربری یا رمز عبور خود را اشتباه وارد کرده اید.";
                CustomValidator1.IsValid = false;
            }
        }
    }
}