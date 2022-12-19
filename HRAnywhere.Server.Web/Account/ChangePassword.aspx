<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ChangePassword.aspx.cs" Inherits="HRAnywhere.Server.Web.Account.ChangePassword" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .style1
        {
            width: 100%;
            direction: rtl;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <telerik:RadFormDecorator ID="RadFormDecorator1" runat="server" />
    <table class="style1">
        <tr>
            <td>
                <asp:Label ID="Label1" runat="server" Text="رمز عبور فعلی :‌ "></asp:Label>
                <asp:TextBox ID="txtCurrPassword" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="txtCurrPassword" ID="RequiredFieldValidator1" runat="server" 
                    ErrorMessage="فیلد رمز عبور فعلی را بر کنید." ForeColor="Red" Text="*" Font-Bold="true"></asp:RequiredFieldValidator>
            </td>
            <td>
                &nbsp;</td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="Label2" runat="server" Text="رمز عبور جدید :‌ "></asp:Label>
                <asp:TextBox ID="txtNewPassword" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="txtNewPassword" 
                    ID="RequiredFieldValidator2" runat="server" 
                    ErrorMessage="فیلد رمز عبور جدید را بر کنید." ForeColor="Red" Text="*" 
                    Font-Bold="true"></asp:RequiredFieldValidator>
            </td>
            <td>
                &nbsp;</td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="Label3" runat="server" Text="تکرار رمز عبور جدید :‌ "></asp:Label>
                <asp:TextBox ID="txtNewPasswordConfirm" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="txtNewPasswordConfirm" 
                    ID="RequiredFieldValidator3" runat="server" 
                    ErrorMessage="فیلد تکرار رمز عبور جدید را بر کنید." ForeColor="Red" Text="*" 
                    Font-Bold="true"></asp:RequiredFieldValidator>
                <asp:CompareValidator ID="CompareValidator1" runat="server" 
                    ErrorMessage="تکرار رمز عبور با رمز عبور همخوانی ندارد." Text="*" ControlToCompare="txtNewPassword" ControlToValidate="txtNewPasswordConfirm" ForeColor="Red" Font-Bold="true"></asp:CompareValidator>
            </td>
            <td>
                &nbsp;</td>
        </tr>
        <tr>
            <td>
                <asp:Button ID="Button1" runat="server" Text="ثبت" onclick="Button1_Click" /><br />
                <asp:CustomValidator ID="CustomValidator1" runat="server" Display="None" ></asp:CustomValidator>
                <asp:ValidationSummary ID="ValidationSummary1" runat="server" ForeColor="Red" Font-Bold="true" />
                </td>
            <td>
                &nbsp;</td>
        </tr>
    </table>
</asp:Content>
