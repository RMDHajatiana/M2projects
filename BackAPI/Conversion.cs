namespace BackAPI
{
    public static class Conversion
    {

        public static DateTime ToDateTime(this DateOnly dateOnly)
        {
            // Convertir DateOnly en DateTime 

            return new DateTime(dateOnly.Year, dateOnly.Month, dateOnly.Day);
        }

    }
}

