using System;
namespace PruebaDesarrollo.Models
{
    public class CommandResult<T>
    {
        public bool Result { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        public CommandResult(bool Result, string Message, T Data)
        {
            this.Result = Result;
            this.Message = Message;
            this.Data = Data;
        }
    }
}

