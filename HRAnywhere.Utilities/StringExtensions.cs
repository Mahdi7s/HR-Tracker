using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace HRAnywhere.Utilities
{
    public static class StringExtensions
    {
        public static string ToSha(this string strToSha)
        {
            var hashTool = new SHA512Managed();
            var shaBytes = hashTool.ComputeHash(Encoding.UTF8.GetBytes(strToSha));
            return Convert.ToBase64String(shaBytes);
        }

        public static string ToMd5(this string strToMd5)
        {
            var md5 = MD5.Create();
            var md5Bytes = md5.ComputeHash(Encoding.UTF8.GetBytes(strToMd5));
            return Convert.ToBase64String(md5Bytes);
        }
    }
}
