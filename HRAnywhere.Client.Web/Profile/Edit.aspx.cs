using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HRAnywhere.Client.Web.HRAnywhereServiceReference;
using HRAnywhere.Model;
using HRAnywhere.Client.Web.Utils;

namespace HRAnywhere.Client.Web.Profile
{
    public partial class Edit : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                var proxy = Helpers.NewServiceProxy();
                var member = proxy.GetMe();

                if (member != null)
                {
                    txtName.Text = member.FirstName;
                    txtLastName.Text = member.LastName;
                }
                proxy.Close();
            }
        }

        protected void btnSave_Click(object sender, EventArgs e)
        {
            var proxy = Helpers.NewServiceProxy();
            var member = proxy.GetMe();

            member.FirstName = txtName.Text;
            member.LastName = txtLastName.Text;

            proxy.UpdateMember(member);

            proxy.Close();
        }
    }
}