using System;
using System.Collections.Generic;
using System.Text;

namespace HM.GM.DAL.Model
{
    public class SKillCompentency
    {
        public SKillCompentency(int _id, string _value, Practice _resource)
        {
            id = _id;
            value = _value;
            parent = _resource;
        }
        public int id { get; set; }
        public Practice parent { get; set; }
        public string value { get; set; }
    }
}
