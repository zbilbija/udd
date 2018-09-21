package netgloo.helpers;

import java.util.HashMap;
import java.util.Map;

public class CirilicLatinConverter {
	
	static char[] cyrilic = new char[] {
			'\u0410', 	'\u0430',	//A
			'\u0411',	'\u0431',	//B
			'\u0412', 	'\u0432',	//V
			'\u0413', 	'\u0433',	//G
			'\u0414',	'\u0434',	//D
			'\u0402',	'\u0452',	//?
			'\u0415', 	'\u0435',	//E
			'\u0416',	'\u0436',	//?
			'\u0417',	'\u0437',	//Z			
			'\u0418',	'\u0438',	//I
			'\u0408',	'\u0458',	//J
			'\u041A',	'\u043A',	//K
			'\u041B',	'\u043B',	//L
			'\u0409',	'\u0459',	//Lj
			'\u041C',	'\u043C',	//M
			'\u041D',	'\u043D',	//N
			'\u040A',	'\u045A',	//Nj
			'\u041E', 	'\u043E',	//O
			'\u041F',	'\u043F', 	//P
			'\u0420',	'\u0440',	//R
			'\u0421',	'\u0441',	//S
			'\u0422',	'\u0442',	//T
			'\u040B',	'\u045B',	//?
			'\u0423',	'\u0443',	//U
			'\u0424',	'\u0444',	//F
			'\u0425',	'\u0445',	//H
			'\u0426',	'\u0446',	//C	
			'\u0427', 	'\u0447',	//?
			'\u040F',	'\u045F',	//D?
			'\u0428',	'\u0448'	//?
	};
	
	static String[] latin = new String[] {
			"A", 		"a",
			"B",		"b",
			"V",		"v",
			"G",		"g",
			"D",		"d",
			"\u0110",	"\u0111",
			"E",		"e",
			"\u017D",	"\u017E",
			"Z",		"z",
			"I",		"i",
			"J",		"j",
			"K",		"k",
			"L",		"l",
			"Lj",		"lj",
			"M",		"m",
			"N",		"n",
			"Nj",		"nj",
			"O",		"o",
			"P",		"p",
			"R",		"r",
			"S",		"s",
			"T",		"t",
			"\u0106",	"\u0107",
			"U",		"u",
			"F",		"f",
			"H",		"h",
			"C",		"c",
			"\u010C",	"\u010D",
			"D\u017E",	"d\u017E",
			"\u0160",	"\u0161"};
	
	/**
	 * Mapping of cyrillic characters to latin characters.
	 */
	static Map<Character, String> cyrMapping = new HashMap<Character, String>();
	/**
	 * Mapping of latin characters to cyrillic characters.
	 */
	static Map<String, Character> latMapping = new HashMap<String, Character>();
		
	// Static initialization of mappings between cyrillic and latin letters.
	static {			
		for (int i=0; i < cyrilic.length; i++) {
			cyrMapping.put(new Character(cyrilic[i]), latin[i]);
			latMapping.put(latin[i], new Character(cyrilic[i]));
		}
	}

	/**
	 * Converts latin text to Serbian cyrillic
	 * 
	 * @param latinText - Latin text to be converted to cyrillic.
	 * 
	 * @return - Serbian cyrillic representation of given latin text.
	 * */
	public static String latinToCyrillic(String latinText) {
		StringBuffer latBuffer = new StringBuffer(latinText);
		StringBuffer cyrBuffer = new StringBuffer();

		for (int i=0; i < latBuffer.length(); i++) {
			String s = latBuffer.substring(i, i+1);
			if (i < latBuffer.length() - 1 ) {
				char c = latBuffer.charAt(i+1);
				if (((s.equals("L") || s.equals("l")
				|| s.equals("N") || s.equals("n")) && (c == 'J' || c == 'j'))) {
					s = s + 'j';
					i++;
				} else if ((s.equals("D") || s.equals("d")) 
						&& (c == '\u017D' || c == '\u017E')) {
					s = s + '\u017E';
					i++;
				}
			}
			if (latMapping.containsKey(s)) {
				cyrBuffer.append(((Character)latMapping.get(s)).charValue());
			} else {
				cyrBuffer.append(s);
			}
		}
		return cyrBuffer.toString();
	}
	
	/**
	 * Converts given Serbian cyrillic text to latin text.
	 * 
	 * @param cyrillicText - Cyrillic text to be converted to latin text.
	 * 
	 * @return latin representation of given cyrillic text.
	 * */
	public static String cyrilicToLatin(String cyrillicText) {
		StringBuffer cyrBuffer = new StringBuffer(cyrillicText);
		StringBuffer latinBuffer = new StringBuffer();
		for (int i = 0; i < cyrBuffer.length(); i++) {
			char c = cyrBuffer.charAt(i);
			Character character = new Character(c);
			if (cyrMapping.containsKey(character)) {
				latinBuffer.append(cyrMapping.get(character));
			} else {
				latinBuffer.append(c);
			}			
		}
		return latinBuffer.toString();
	}
	
	public static void cir2lat(String text) {
		
//		String ret = "";
//		for (int i = 0; i < text.length(); i++) {
//			char c=text.charAt(i);
//			switch(c){
//				case '\u0430': ret+="a"; break;
//				case '\u0431': ret+="b"; break;
//				case '\u0446': ret+="c"; break;
//				case '\u0434': ret+="d"; break;
//				case '\u0435': ret+="e"; break;
//				case '\u0444': ret+="f"; break;
//				case '\u0433': ret+="g"; break;
//				case '\u0445': ret+="h"; break;
//				case '\u0438': ret+="i"; break;
//				case '\u0458': ret+="j"; break;
//				case '\u043A': ret+="k"; break;
//				case '\u043B': ret+="l"; break;
//				case '\u043C': ret+="m"; break;
//				case '\u043D': ret+="n"; break;
//				case '\u043E': ret+="o"; break;
//				case '\u043F': ret+="p"; break;
//				case '\u0440': ret+="r"; break;
//				case '\u0441': ret+="s"; break;
//				case '\u0442': ret+="t"; break;
//				case '\u0443': ret+="u"; break;
//				case '\u0432': ret+="v"; break;
//				case '\u0437': ret+="z"; break;
//				case '\u0410': ret+="A"; break;
//				case '\u0411': ret+="B"; break;
//				case '\u0426': ret+="C"; break;
//				case '\u0414': ret+="D"; break;
//				case '\u0415': ret+="E"; break;
//				case '\u0424': ret+="F"; break;
//				case '\u0413': ret+="G"; break;
//				case '\u0425': ret+="H"; break;
//				case '\u0418': ret+="I"; break;
//				case '\u0408': ret+="J"; break;
//				case '\u041A': ret+="K"; break;
//				case '\u041B': ret+="L"; break;
//				case '\u041C': ret+="M"; break;
//				case '\u041D': ret+="N"; break;
//				case '\u041E': ret+="O"; break;
//				case '\u041F': ret+="P"; break;
//				case '\u0420': ret+="R"; break;
//				case '\u0421': ret+="S"; break;
//				case '\u0422': ret+="T"; break;
//				case '\u0423': ret+="U"; break;
//				case '\u0412': ret+="V"; break;
//				case '\u0417': ret+="Z"; break;
//				case '\u045B': ret+="\u0107"; break;
//				case '\u0447': ret+="\u010D"; break;
//				case '\u0452': ret+="\u0111"; break;
//				case '\u0448': ret+="\u0161"; break;
//				case '\u0436': ret+="\u017E"; break;
//				case '\u040B': ret+="\u0106"; break;
//				case '\u0427': ret+="\u010C"; break;
//				case '\u0402': ret+="\u0110"; break;
//				case '\u0428': ret+="\u0160"; break;
//				case '\u0416': ret+="\u017D"; break;
//				case '\u045F': ret+="d\u017E";break;
//				case '\u0459': ret+="lj";break;
//				case '\u045A': ret+="nj";break;
//				case '\u040F': ret+="D\u017E";break;
//				case '\u0409': ret+="Lj";break;
//				case '\u040A': ret+="Nj";break;
//				default : ret+=c;
//			}
//		}
//		return ret;
	}

}
