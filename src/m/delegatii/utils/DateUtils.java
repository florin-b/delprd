package m.delegatii.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DateUtils {

	public static final String oraStopDelegatie = "1800";

	public static String getCurrentDate() {
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		return dateFormat.format(new Date());
	}

	public static String getCurrentTime() {
		DateFormat dateFormat = new SimpleDateFormat("HHmmss");
		return dateFormat.format(new Date());

	}

	public static String formatDate(String strDate) {

		String formatted = "";

		try {
			SimpleDateFormat formatFinal = new SimpleDateFormat("yyyy-MM-dd");
			Date date = formatFinal.parse(strDate);

			String pattern = "dd-MMM-yyyy";
			SimpleDateFormat formatInit = new SimpleDateFormat(pattern, new Locale("ro"));

			formatted = formatInit.format(date);
		} catch (ParseException p) {

		}

		return formatted;

	}
	
	
	public static String formatTime(String strTime)
	{
		return strTime.substring(0,2) + ":" + strTime.substring(2,4);
	}

}
