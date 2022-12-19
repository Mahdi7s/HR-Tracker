using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HRAnywhere.Client.Web.HRAnywhereServiceReference;
using HRAnywhere.Model;
using HRAnywhere.Client.Web.Utils;

namespace HRAnywhere.Client.Web.Account
{
    public partial class ChangePassword : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            var proxy = Helpers.NewServiceProxy();

            if (proxy.ChangePassword(Helpers.UserName, txtCurrPassword.Text, txtNewPassword.Text))
            {
                Helpers.Password = txtNewPassword.Text;
            }
            else
            {
                CustomValidator1.ErrorMessage = "رمز عبور فعلی را اشتباه وارد کرده اید.";
                CustomValidator1.IsValid = false;
            }
            proxy.Close();
        }
    }
}