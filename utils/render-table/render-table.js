// 根据后端返回的数据，和具体的那一个整体（那两个子组件：四个表table 和 底部栏bottom），来进行数据渲染（调用子组件内部的方法）
function setRecord(data, refFragment, vm) {
	// console.log(this.$refs.RefTableMain.$children[0].$children[0].$children[0].$children[0])
	// console.log(this.$refs.RefTableMain.$children[0].$children[0].$children[1].$children[0])
	// console.log(this.$refs.RefTableMain.$children[0].$children[1].$children[0].$children[0])
	// console.log(this.$refs.RefTableMain.$children[0].$children[1].$children[1].$children[0])
	// this.$refs.RefTableMain.$children[0].$children[0].$children[0].$children[0].setIncome({})
	// this.$refs.RefTableMain.$children[0].$children[0].$children[1].$children[0].setExpenditure({})
	// this.$refs.RefTableMain.$children[0].$children[1].$children[0].$children[0].setAssets({})
	// this.$refs.RefTableMain.$children[0].$children[1].$children[1].$children[0].setLiabilities({})
	// this.$refs.RefBottomMain.setButtom({})
	const income1 = data.income.filter((item) => item.class === 5).map((item) => ({ id: item.id, card_name: item.card_name, value: item.value }))
	const income2 = data.income.filter((item) => item.class === 6).map((item) => ({ id: item.id, card_name: item.card_name, num: item.num, value: item.value }))
	const income3 = data.income.filter((item) => item.class === 1).map((item) => ({ id: item.id, card_name: item.card_name, value: item.value }))
	const income4 = data.income.filter((item) => item.class === 3).map((item) => ({ id: item.id, card_name: item.card_name, num: item.num, value: item.value }))
	vm.$refs[`RefTable${refFragment}`].$children[0].$children[0].$children[0].$children[0].setIncome({
		in_salary: data.basic_info.in_salary,
		in_partner: data.basic_info.in_partner,
		income1,
		income2,
		income3,
		income4
	})
	vm.$refs[`RefTable${refFragment}`].$children[0].$children[0].$children[1].$children[0].setExpenditure({
		child_num: data.basic_info.child_num,
		out_child: data.basic_info.out_child,
		out_personal: data.basic_info.out_personal,
		out_partner: data.basic_info.out_partner,
		out_tax: data.basic_info.out_tax,
		out_self_housing: data.basic_info.out_self_housing,
		out_rent: data.basic_info.out_rent,
		out_car_loan: data.basic_info.out_car_loan,
		out_credit_card: data.basic_info.out_credit_card,
		out_additional_liabilities: data.basic_info.out_additional_liabilities,
		out_insuraunce: data.basic_info.out_insuraunce,
		out_healthy: data.basic_info.out_healthy,
		out_bank_loan_interest: data.basic_info.out_bank_loan_interest
	})
	const asset1 = data.assets.filter((item) => item.class === 4).map((item) => ({ id: item.id, card_name: item.card_name }))
	const asset2 = data.assets.filter((item) => item.class === 2).map((item) => ({ id: item.id, card_name: item.card_name, num: item.num, value: item.value }))
	const asset3 = data.assets.filter((item) => item.class === 1).map((item) => ({ id: item.id, card_name: item.card_name, num: item.num, value: item.value }))
	vm.$refs[`RefTable${refFragment}`].$children[0].$children[1].$children[0].$children[0].setAssets({
		asset1,
		asset2,
		asset3
	})
	const debt1 = data.debts.filter((item) => item.class === 1).map((item) => ({ id: item.id, card_name: item.card_name, value: item.value }))
	const debt2 = data.debts.filter((item) => item.class === 3).map((item) => ({ id: item.id, card_name: item.card_name, value: item.value }))
	vm.$refs[`RefTable${refFragment}`].$children[0].$children[1].$children[1].$children[0].setLiabilities({
		debt_self_housing: data.basic_info.child_num,
		debt_car_loan: data.basic_info.child_num,
		debt_credit_card: data.basic_info.child_num,
		debt_additional_liabilities: data.basic_info.child_num,
		debt1,
		debt2,
		debt_bank_loan: data.basic_info.debt_bank_loan
	})
	vm.$refs[`RefBottom${refFragment}`].setButtom({
		cash_flow: data.basic_info.cash_flow,
		passive_in: data.basic_info.passive_in,
		cash_on_hand: data.basic_info.cash_on_hand,
		energy: data.basic_info.energy,
		basics_in: data.basic_info.basics_in,
		basics_out: data.basic_info.basics_out
		// charitable: data.basic_info.charitable
	})
	// console.log(this.$refs.RefTableMain)
	// console.log(this.$refs.RefBottomMain)
	// console.log(this.$refs.RefTableEject.$children[0].$children[0].$children[0].$children[0])
	// console.log(this.$refs.RefTableEject.$children[0].$children[0].$children[1].$children[0])
	// console.log(this.$refs.RefTableEject.$children[0].$children[1].$children[0].$children[0])
	// console.log(this.$refs.RefTableEject.$children[0].$children[1].$children[1].$children[0])
	// this.$refs.RefTableEject.$children[0].$children[0].$children[0].$children[0].setIncome({})
	// this.$refs.RefTableEject.$children[0].$children[0].$children[1].$children[0].setExpenditure({})
	// this.$refs.RefTableEject.$children[0].$children[1].$children[0].$children[0].setAssets({})
	// this.$refs.RefTableEject.$children[0].$children[1].$children[1].$children[0].setLiabilities({})
	// this.$refs.RefBottomMain.setButtom({})
	// console.log(this.$refs.RefTableEject)
	// console.log(this.$refs.RefBottomEject)
}

export default setRecord
