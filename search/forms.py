from django import forms

class PostForm(forms.ModelForm):
	class Meta:
		model: Post
		fields=['text']
		widgets = {
			'text': forms.TextInput(
					attrs={'id': 'post-text', 'required': True, 'placeholder': 'placeholder text'}
				),
		}