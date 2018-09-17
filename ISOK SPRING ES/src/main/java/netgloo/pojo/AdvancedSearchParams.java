package netgloo.pojo;

public class AdvancedSearchParams {

	private String field1;

	private String value1;
	
	private String field2;
	
	private String value2;

	public AdvancedSearchParams() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AdvancedSearchParams(String field1, String value1, String field2, String value2) {
		super();
		this.field1 = field1;
		this.value1 = value1;
		this.field2 = field2;
		this.value2 = value2;
	}

	public String getField1() {
		return field1;
	}

	public void setField1(String field1) {
		this.field1 = field1;
	}

	public String getValue1() {
		return value1;
	}

	public void setValue1(String value1) {
		this.value1 = value1;
	}

	public String getField2() {
		return field2;
	}

	public void setField2(String field2) {
		this.field2 = field2;
	}

	public String getValue2() {
		return value2;
	}

	public void setValue2(String value2) {
		this.value2 = value2;
	}

	@Override
	public String toString() {
		return "AdvancedSearchParams [field1=" + field1 + ", value1=" + value1 + ", field2=" + field2 + ", value2="
				+ value2 + "]";
	}
}
