$(document).ready(function() {
	addTemplates();
	$(document).on('submit', '#templateFields', function(e) {
		var fields = $(e.currentTarget).serializeArray();
		updateTemplate(fields);
		return false;
	});
});

function addTemplates() {
	var dropdown = $('#templateDropdown');
	Object.keys(templates).forEach(function(key) {
		var button = $(document.createElement('button'))
			.addClass('dropdown-item')
			.attr('type', 'button')
			.html(key);
		button.click(function(e) {
			loadTemplate(this);
		});
		dropdown.append(button);
	});
}

function loadTemplate(button) {
	var template = $(button).html();
	if ($('#templateText').length) {
		$('#templateText').html(templates[template].text);
		$('#templateLabel').html(template);
	} else {
		var container = $(document.createElement('div')).addClass('row');
		var column = $(document.createElement('div')).addClass('col-md-7 m-auto p-0');
		container.append(column);
		var label = $(document.createElement('h4'))
			.attr('for', 'templateText')
			.attr('id', 'templateLabel')
			.html(template)
			.addClass('text-center font-size-50');
		column.append(label);
		var text = $(document.createElement('textarea'))
			.html(templates[template].text)
			.css('width', '100%')
			.attr('id', 'templateText')
			.attr('rows', 10);
		column.append(text);
		$('.container').append(container);
	}
	loadFields(template);
}

function loadFields(template) {
	var fields = templates[template].fields;
	var text = templates[template].text;
	var form = $(document.createElement('form'))
		.attr('id', 'templateFields')
		.addClass('col-md-9 m-auto p-0');
	fields.forEach(function(field, index) {
		var formGroup = $(document.createElement('div')).addClass('form-group');
		var label = $(document.createElement('label'))
			.attr('for', `formField${index}`)
			.html(field.name);
		var formField = $(document.createElement(field.type))
			.attr('id', `formField${index}`)
			.attr('name', field.name)
			.addClass('form-control');
		if (field.type == 'select') {
			field.options.forEach(function(optionVal) {
				var option = $(document.createElement('option'))
					.val(optionVal)
					.html(optionVal);
				formField.append(option);
			});
		}
		formGroup.append(label, formField);
		form.append(formGroup);
	});
	var btnGroup = $(document.createElement('div')).addClass('form-row d-flex justify-content-between');
	var col1 = $(document.createElement('div')).addClass('col-auto');
	var col2 = $(document.createElement('div')).addClass('col-auto');
	var col3 = $(document.createElement('div')).addClass('col-auto');

	var submit = $(document.createElement('button'))
		.attr('type', 'submit')
		.addClass('btn btn-secondary')
		.html('Update Template')
		.attr('id', 'submit');
	col1.append(submit);
	var reset = $(document.createElement('button'))
		.attr('type', 'button')
		.addClass('btn btn-danger')
		.html('Reset Template')
		.attr('id', 'reset');
	reset.click(function(e) {
		$('#templateText').html(templates[$('#templateLabel').html()].text);
	});
	col2.append(reset);
	var clipboard = $(document.createElement('button'))
		.attr('type', 'button')
		.addClass('btn btn-info')
		.html('Copy to Clipboard')
		.attr('id', 'clipboard');
	clipboard.click(function(e) {
		document.getElementById('templateText').select();
		document.execCommand('copy');
		window.getSelection().removeAllRanges();
		var $notification = $('#notification');
		$notification.html('Copied Template to Clipboard');
		$notification
			.fadeIn(500)
			.delay(3000)
			.fadeOut(750);
	});
	col3.append(clipboard);
	btnGroup.append(col1, col2, col3);
	form.append(btnGroup);

	if ($('#templateFields').length) {
		$('#templateFields').replaceWith(form);
	} else {
		$('.container').append(form);
		var notificationDiv = $(document.createElement('div')).addClass('row mt-4');
		var notificationCol = $(document.createElement('div')).addClass('col-md-9 m-auto p-0');
		notificationDiv.append(notificationCol);
		var notification = $(document.createElement('p'))
			.attr('id', 'notification')
			.addClass('text-info text-right')
			.css('display', 'none');
		notificationCol.append(notification);
		$('.container').append(notificationDiv);
	}
}

function updateTemplate(formFields) {
	var template = templates[$('#templateLabel').html()];
	var templateText = template.text;
	var templateFields = template.fields;
	templateFields.forEach(function(templateField) {
		formFields.forEach(function(formField) {
			if (templateField.name == formField.name) {
				var regex = new RegExp(templateField.selector, 'g');
				templateText = templateText.replace(regex, formField.value);
			}
		});
	});
	$('#templateText').html(templateText);
}
