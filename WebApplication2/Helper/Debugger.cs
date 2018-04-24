using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
namespace WebApplication2.Helper
{
    public class Debugger
    {
        StreamWriter debugFile;   
        public Debugger()
        {

            //debugFile = new StreamWriter("Debug.txt");
        }

        public void Log(string s)
        {
            using (debugFile = new StreamWriter("Debug.txt"))
            {
                debugFile.Write(s);
            }
        }
    }
}
