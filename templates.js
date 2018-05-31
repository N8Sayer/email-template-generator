var templates = {
	Default: {
		text: 'This is the default template.',
		fields: [
			{
				name: 'Full Name',
				selector: '%fullname%',
				type: 'input',
				options: []
			}
		]
	},
	Personal: {
		text:
			'This is the template that lets you insert %fullname% here. The dropdown options go here: %dropdown%. This is the template that lets you insert %fullname% here. The dropdown options go here: %dropdown%.',
		fields: [
			{
				name: 'Full Name',
				selector: '%fullname%',
				type: 'input',
				options: []
			},
			{
				name: 'Dropdown',
				selector: '%dropdown%',
				type: 'select',
				options: ['1', '2', '3']
			}
		]
	},
	'HTML Text': {
		text:
			'<h3>Maybe you wanted some html text?</h3>' +
			'<br>' +
			'<p>Separating every line out like this can help when making the template</p>',
		fields: []
	}
};
