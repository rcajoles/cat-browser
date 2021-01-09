<template>
	<div class="home">
		<b-container>

			<b-row>
				<div class="col-md-3 col-sm-6 col-12" style="text-align: start;">
					<h1 style="font-weight: 700;">Cat Browser</h1>
				</div>
			</b-row>

			<b-row style="padding: 10px 0;">
				<div class="col-md-3 col-sm-6 col-12">
					<b-form-group
						id="fieldset-1"
						label="Breed"
						label-for="breed"
						label-size="lg"
					>
						<b-form-select
							id="breed"
							v-model="chosenBreed"
							@change="changeBreed"
							:options="options"
							size="lg"
							class="mt-3"
						>
							<template #first>
								<b-form-select-option :value="null" disabled>
									Select Breed
								</b-form-select-option>
							</template>
						</b-form-select>
					</b-form-group>
				</div>

			</b-row>


			<b-row>
				<template v-if="catList.length > 0">
						<div class="col-md-3 col-sm-6 col-12" v-for="item in catList" :key="item.id">
							<b-card :img-src="item.url" img-alt="Image" img-top >
								<b-button href="#" variant="primary" class="view-details" @click="viewCatDetail(item)" >View Details</b-button>
							</b-card>
						</div>
				</template>

				<div class="col-md-3 col-sm-6 col-12" v-else>
					<h2>No cats available.</h2>
				</div>

			</b-row>

			<b-row>
				<div v-if="catList.length > 0 && noMoreCatsToShow == false" class="col-md-3 col-sm-6 col-12" style="text-align: start;">
					<b-button size="lg" variant="success" @click="showMoreCats">Load more</b-button>
				</div>
			</b-row>

		</b-container>

	</div>
</template>

<script>
import cats from '../services/cats';

export default {
	name: "Home",
	created() {
		let hasQuery = this._.isEmpty(this.$route.query, true);

		cats.getCatBreeds()
			.then((response) => {

				if (response.status == 200) {
					if (response.data.length) {
						response.data.map((breed) => {
							this.options.push({
								value: breed.name,
								text: breed.name,
								keyword: breed.id,
							});
						});

						return response;
					}

				}
			})
			.then(() => {
				if (!hasQuery) {

					let breedIndex = this._.find(this.options, { keyword: this.$route.query.breed });

					this.chosenBreed = breedIndex.value;

					this.changeBreed(this.chosenBreed);

				}
			})
			.catch((error) => {
				console.log("error: ", error);
			});




	},
	data() {
		return {
			options: [],
			catList: [],
			page: 0,
			order: 'ASC',
			limit: 10,
			chosenBreed: null,
			pickedBreed: null,
			noMoreCatsToShow: false,
		};
	},
	methods: {
		changeBreed(breed) {
			let breedIndex = this.lodash.findIndex(this.options, { value: breed });

			if (breedIndex != -1) {
				this.pickedBreed = this.options[breedIndex];
			}

			let params = {
				page: this.page,
				limit: this.limit,
				keyword: this.pickedBreed.keyword,
				order: this.order
			}

			cats.getCatBreedList(params)
				.then(response => {
					if (response.status == 200) {
						this.catList = response.data;

						this.noMoreCatsToShow = response.data.length < 10 ? true : false;
					}
				})
				.catch(error => {
					console.log('error: ', error);
				})
		},

		showMoreCats() {

			let params = {
				page: this.page,
				limit: this.limit,
				keyword: this.pickedBreed.keyword,
				order: this.order
			};

			if (this.catList.length > 0) {

				this.page = params.page++;

			}

			cats.getCatBreedList(params)
				.then(response => {
					if (response.status == 200) {

						response.data.forEach(cat => {
							this.catList.push(cat);
						});

						this.noMoreCatsToShow = response.data.length < 10 ? true : false;

					}
				})
				.catch(error => {
					console.log('error: ', error);
				});

			console.log('catList: ', this.catList.length);
			console.log('page: ', this.page);
			console.log('breed: ', this.chosenBreed);
		},

		viewCatDetail(param) {
			this.$router.push({ path: `/about/breed/${param.breeds[0].name}/${param.id}` });
		}
	},

};
</script>


<style>

@media (min-width: 768px) {
	.col-md-3 {
		flex: 0 0 25%;
		max-width: 25%;
	}

}

@media (min-width: 576px){
	.col-sm-6 {
		flex: 0 0 50%;
		max-width: 50%;
	}
}

.view-details {
	width: -webkit-fill-available;
	width: 100%;
}

.home {
	padding: 50px 0;
}

.home .card {
	margin-bottom: 20px;
}

.home .col-form-label-lg {
	padding-bottom: 0;
	margin: 0;
}
</style>