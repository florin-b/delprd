package m.delegatii.helpers;

import java.util.List;

import m.delegatii.beans.NavigationDetails;
import m.delegatii.beans.UserInfo;
import m.delegatii.enums.TipAnjagat;

public class HelperMeniu {

	public static void addMenuOption(List<NavigationDetails> navigationLinks, NavigationDetails nd) {

		// tratare situatie expirare sesiune
		TipAnjagat tipAngajat = UserInfo.getInstance().getTipAngajat();

		switch (tipAngajat) {
		case AV:
		case ATR:
		case SSCFI:
		case KA:
			switch (nd.getNume()) {
			case CREEAZA_DELEGATIE:
			case MODIFICA_DELEGATIE:
			case AFISEAZA_DELEGATIE:
			case EXIT:
				navigationLinks.add(nd);
				break;

			default:
				break;

			}
			break;

		case SD:
		case DZ:
		case DAG:
		case DV:
			switch (nd.getNume()) {
			case CREEAZA_DELEGATIE:
			case MODIFICA_DELEGATIE:
			case APROBA_DELEGATIE:
			case AFISEAZA_DELEGATIE:
			case EXIT:
				navigationLinks.add(nd);
				break;

			default:
				break;

			}
			break;

		default:

			break;
		}

	}

}
