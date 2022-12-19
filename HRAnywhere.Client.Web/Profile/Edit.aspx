<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="Edit.aspx.cs" Inherits="HRAnywhere.Client.Web.Profile.Edit" %>

<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <telerik:RadFormDecorator ID="RadFormDecorator1" runat="server" />
    <table class="auto-style1">
        <tr>
            <td>
                <asp:Label ID="Label1" runat="server" Text="نام : "></asp:Label>
                <asp:TextBox ID="txtName" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Text="*"
                    ErrorMessage=".فیلد نام را بر کنید" Font-Bold="True" ForeColor="Red" ControlToValidate="txtName"></asp:RequiredFieldValidator>
            </td>
            <td>
                <asp:Label ID="Label2" runat="server" Text="نام خانوادگی : "></asp:Label>
                <asp:TextBox ID="txtLastName" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="txtLastName" ID="RequiredFieldValidator2"
                    runat="server" Text="*" Font-Bold="True" ForeColor="Red" ErrorMessage="فیلد نام خانوادگی را بر کنید."></asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td>
                <asp:Button ID="btnSave" runat="server" Text="ذخیره" onclick="btnSave_Click"  />
            </td>
            <td>
            </td>
        </tr>
    </table>
</asp:Content>
