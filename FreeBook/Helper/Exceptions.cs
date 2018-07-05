using System;


namespace WebApplication2.AppExceptions
{
    public class UserNameExistsException : Exception
    {
        public UserNameExistsException(string message) : base(message)
        {

        }
    }
    public class UserNameDoesNotExistException : Exception
    {
        public UserNameDoesNotExistException(string message) : base(message)
        {

        }
    }
    public class InvalidInputException : Exception
    {
        public InvalidInputException(string message) : base(message)
        {

        }
    }
   
}