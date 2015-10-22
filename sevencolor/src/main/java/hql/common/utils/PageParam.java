package hql.common.utils;
/**
 * 分页参数
 */
public class PageParam {
	
	private int page;  //当前页
	private int limit;  //每页记录数
	private int start;  //起始页
	
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}

}
