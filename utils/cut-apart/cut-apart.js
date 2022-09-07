function cutApart(strand) {
	if (typeof strand === 'number') {
		strand = String(strand)
	}
	return strand.replace(/\B(?=(?:\d{3})+\b)/g, ',')
}

export default cutApart
// \B匹配不是单词开头或者结束的位置
// (?=exp)匹配exp前面的位置
// (?:exp)匹配exp，不捕获匹配的文本，也不给此分组分配组号
// \b代表单词分界位置
