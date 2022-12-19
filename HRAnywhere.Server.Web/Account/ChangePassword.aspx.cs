using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HRAnywhere.Server.Web.Account
{
    public partial class ChangePassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            var mp = new Membership.UserMembershipProvider();
            if (!mp.ChangePassword(User.Identity.Name, txtCurrPassword.Text, txtNewPassword.Text))
            {
                CustomValidator1.ErrorMessage = "رمز عبور فعلی را اشتباه وارد کرده اید.";
                CustomValidator1.IsValid = false;
            }
        }
    }
}