using System;
using System.Text.RegularExpressions;

namespace FreeBook.Validation
{
    public class Validator
    {
        public static bool UsernameValidator(string un)
        {
            return !un.Contains(" ");
        }
        public static bool PasswordValidator(string pw)
        {
            //bool isValid;
            //string pattern = "[a-zA-Z-_0-9]";
            //var reg = new Regex(pattern);
            //var match = new Match(un,reg);
            //match.
            //if ((un,reg))
            return !pw.Contains(" ");
        }
        public static bool NameValidator(string n)
        {
            return true;
        }

        public static bool RegistrationValidator(string fn, string ln, string un, string pw)
        {
            var isValid = false;
            if (Validator.NameValidator(fn) && Validator.NameValidator(ln) && Validator.UsernameValidator(un) && Validator.PasswordValidator(pw))
                isValid = true;
            return isValid;
        }
        public static bool LoginValidator(string un, string pw)
        {
            var isValid = false;
            if (Validator.UsernameValidator(un) && Validator.PasswordValidator(pw))
                isValid = true;
            return isValid;
        }
    }
}