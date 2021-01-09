<template>
	<div class="about">
		<b-container>

			<b-card
				no-body
				header-tag="header"
			>

				<b-card-header style="text-align: start;">
					<b-button variant="primary" @click="backToList()" >Back</b-button>
				</b-card-header>

				<b-card-img :src="imgUrl" alt="image"></b-card-img>

				<b-card-body style="text-align: start;">
					<h4>{{ catDetails != null ? catDetails.breeds[0].name : defaultDetail.name }}</h4>
					<h5>Origin: {{ catDetails != null ? catDetails.breeds[0].origin : defaultDetail.origin }}</h5>
					<h6>{{ catDetails != null ? catDetails.breeds[0].temperament : defaultDetail.temperament }}</h6>
					<b-card-text>
						{{ catDetails != null ? catDetails.breeds[0].description : defaultDetail.description }}
					</b-card-text>
				</b-card-body>

			</b-card>

		</b-container>
	</div>
</template>

<script>
import cats from '../services/cats';

export default {
	beforeCreate(){
		let param = null;

		if (this.$route.params.id) {
			param = {
				id: this.$route.params.id
			}
		}

		cats.getCatDetails(param)
			.then(response => {

				if (response.status == 200) {
					this.catDetails = response.data
					this.imgUrl = response.data.url
				}
			})
			.catch(error => {
				console.log('error: ', error);
			});
	},
	data() {
		return {
			imgUrl: null,
			catDetails: null,
			defaultDetail: {
				name: '',
				origin: '',
				temperament: '',
				description: '',
			}
		}
	},
	methods: {
		backToList() {
			this.$router.push({ path: `/?breed=${this.catDetails.breeds[0].id}` });
		}
	}
}
</script>

<style>

.about {
	padding: 40px 0;
}

.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
</style>