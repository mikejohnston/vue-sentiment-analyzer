<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <a target="_" href="https://github.com/mikejohnston/vue-sentiment-analyzer">
          <b-icon icon="github"></b-icon>
        </a>
        <h1 class="title">vue-sentiment-analyzer</h1>
        <p class="subtitle">
          A sentiment analyzer for text and articles using TensorFlow's toxicity
          model.
        </p>

        <div class="columns is-centered is-fluid">
          <div class="column is-half">
            <p class="has-text-centered">
              <strong>Upload Article:</strong>
              <b-field>
                <b-input placeholder="http://example.com/" v-model="inputURL" expanded></b-input>
                <p class="control">
                  <button @click="uploadArticle()" class="button is-primary">Upload</button>
                </p>
              </b-field>
              <strong>Input:</strong>
              <b-field>
                <b-input v-model="inputText" type="textarea"></b-input>
              </b-field>
              <b-button @click="getToxicity()" type="is-primary" expanded>Analyze</b-button>
              <br />
              <strong>Output:</strong>
              <br />

              <strong>Identity Attack:</strong>
              {{ this.identityAttackMatchFormatted }}
              <br />
              {{ this.identityAttackProb }}
              <b-progress
                type="is-primary"
                :value="identityAttackProbPercent"
                show-value
                format="percent"
              ></b-progress>
              <br />

              <strong>Insult:</strong>
              {{ this.insultMatchFormatted }}
              <br />
              {{ this.insultProb }}
              <b-progress type="is-primary" :value="insultProbPercent" show-value format="percent"></b-progress>
              <br />

              <strong>Obscene:</strong>
              {{ this.obsceneMatchFormatted }}
              <br />
              {{ this.obsceneProb }}
              <b-progress type="is-primary" :value="obsceneProbPercent" show-value format="percent"></b-progress>
              <br />

              <strong>Severe Toxicity:</strong>
              {{ this.severeToxicityMatchFormatted }}
              <br />
              {{ this.severeToxicityProb }}
              <b-progress
                type="is-primary"
                :value="severeToxicityProbPercent"
                show-value
                format="percent"
              ></b-progress>
              <br />

              <strong>Sexual Explicit:</strong>
              {{ this.sexualExplicitMatchFormatted }}
              <br />
              {{ this.sexualExplicitProb }}
              <b-progress
                type="is-primary"
                :value="sexualExplicitProbPercent"
                show-value
                format="percent"
              ></b-progress>
              <br />

              <strong>Threat:</strong>
              {{ this.threatMatchFormatted }}
              <br />
              {{ this.threatProb }}
              <b-progress type="is-primary" :value="threatProbPercent" show-value format="percent"></b-progress>
            </p>
          </div>
        </div>
      </div>
      <b-loading :is-full-page="true" :active.sync="loading"></b-loading>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import toxicityAnalyzer from "@/utils/toxicityAnalyzer";

export default {
  data() {
    return {
      loading: false,
      inputURL: "",
      inputText: "",
      identityAttackMatch: false,
      identityAttackProb: null,
      insultMatch: false,
      insultProb: null,
      obsceneMatch: false,
      obsceneProb: null,
      severeToxicityMatch: false,
      severeToxicityProb: null,
      sexualExplicitMatch: false,
      sexualExplicitProb: null,
      threatMatch: false,
      threatProb: null
    };
  },

  methods: {
    async getToxicity() {
      this.loading = true;
      console.log((analysisOutput = toxicityAnalyzer(this.inputText)));
      let analysisOutput = toxicityAnalyzer(this.inputText);
      this.identityAttackMatch = (await analysisOutput)[0].results[0].match;
      this.identityAttackProb = (
        await analysisOutput
      )[0].results[0].probabilities[1];
      this.insultMatch = (await analysisOutput)[1].results[0].match;
      this.insultProb = (await analysisOutput)[1].results[0].probabilities[1];
      this.obsceneMatch = (await analysisOutput)[2].results[0].match;
      this.obsceneProb = (await analysisOutput)[2].results[0].probabilities[1];
      this.severeToxicityMatch = (await analysisOutput)[3].results[0].match;
      this.severeToxicityProb = (
        await analysisOutput
      )[3].results[0].probabilities[1];
      this.sexualExplicitMatch = (await analysisOutput)[4].results[0].match;
      this.sexualExplicitProb = (
        await analysisOutput
      )[4].results[0].probabilities[1];
      this.threatMatch = (await analysisOutput)[5].results[0].match;
      this.threatProb = (await analysisOutput)[5].results[0].probabilities[1];
      this.loading = false;
    },
    async uploadArticle() {
      console.log(this.inputURL);
      try {
        this.loading = true;

        await axios
          .post("http://localhost:3000/", {
            text: this.inputURL
          })
          .then(
            function(response) {
              this.inputText = response.data;
              this.loading = false;
            }.bind(this)
          );
      } catch (e) {
        console.log(e);
      }
    },
    convertMatch(val) {
      if (val == null) {
        return "Yes";
      } else {
        return "No";
      }
    }
  },
  computed: {
    identityAttackMatchFormatted: function() {
      return this.convertMatch(this.identityAttackMatch);
    },
    identityAttackProbPercent: function() {
      return Math.round((this.identityAttackProb + Number.EPSILON) * 100);
    },
    insultMatchFormatted: function() {
      return this.convertMatch(this.insultMatch);
    },
    insultProbPercent: function() {
      return Math.round((this.insultProb + Number.EPSILON) * 100);
    },
    obsceneMatchFormatted: function() {
      return this.convertMatch(this.obsceneMatch);
    },
    obsceneProbPercent: function() {
      return Math.round((this.obsceneProb + Number.EPSILON) * 100);
    },
    severeToxicityMatchFormatted: function() {
      return this.convertMatch(this.severeToxicityMatch);
    },
    severeToxicityProbPercent: function() {
      return Math.round((this.severeToxicityProb + Number.EPSILON) * 100);
    },
    sexualExplicitMatchFormatted: function() {
      return this.convertMatch(this.sexualExplicitMatch);
    },
    sexualExplicitProbPercent: function() {
      return Math.round((this.sexualExplicitProb + Number.EPSILON) * 100);
    },
    threatMatchFormatted: function() {
      return this.convertMatch(this.threatMatch);
    },
    threatProbPercent: function() {
      return Math.round((this.threatProb + Number.EPSILON) * 100);
    }
  }
};
</script>
