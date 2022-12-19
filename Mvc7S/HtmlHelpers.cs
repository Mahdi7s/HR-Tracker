using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Web.Mvc;

namespace Mvc7S
{
    public static class HtmlHelpers
    {
        public static string CheckBoxList<T>(this HtmlHelper helper, IEnumerable<T> list, Expression<Func<T, object>> itemProperty = null)
        {
            if (list == null || list.Count() <= 0)
                return "<p>list is empty !</p>";

            Func<T, object> getValue = item =>
                {
                    if (itemProperty == null) return item;

                    var itemPropInfo = itemProperty.GetMember() as PropertyInfo;
                    return itemPropInfo.GetValue(item, null);
                };

            var checkBoxItem = "<div class=\"checkboxlistitem\" > " +
                "<input id=\"{0}\" type=\"checkbox\" value=\"false\" /> " +
                "<label for=\"{0}\" >{0}</label>";

            var checkBoxList = "<div class=\"checkboxlist\" >";   // The CSS must contain checkboxlist

            list.Apply(item =>
                {
                    var value = Convert.ToString(getValue(item));
                    checkBoxList += string.Format(checkBoxItem + "<br/>", value);
                });

            return checkBoxList + "</div>";
        }
    }
}