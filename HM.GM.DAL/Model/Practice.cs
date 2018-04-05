using System;
using System.Collections.Generic;
using System.Text;

namespace HM.GM.DAL.Model
{
    public class Practice
    {
        public Practice(int _id, string _value)
        {
            id = _id;
            value = _value;
        }
        public int id { get; set; }
        public string value { get; set; }
    }
}
