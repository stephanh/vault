import Ember from 'ember';
import ListController from 'vault/mixins/list-controller';

const { inject } = Ember;

export default Ember.Controller.extend(ListController, {
  flashMessages: inject.service(),

  actions: {
    delete(model) {
      let type = model.get('identityType');
      let id = model.id;
      return model
        .destroyRecord()
        .then(() => {
          this.send('reload');
          this.get('flashMessages').success(`Successfully deleted ${type}: ${id}`);
        })
        .catch(e => {
          this.get('flashMessages').success(
            `There was a problem deleting ${type}: ${id} - ${e.errors.join(' ') || e.message}`
          );
        });
    },

    toggleDisabled(model) {
      let action = model.get('disabled') ? ['enabled', 'enabling'] : ['disabled', 'disabling'];
      let type = model.get('identityType');
      let id = model.id;
      model.toggleProperty('disabled');

      model
        .save()
        .then(() => {
          this.get('flashMessages').success(`Successfully ${action[0]} ${type}: ${id}`);
        })
        .catch(e => {
          this.get('flashMessages').success(
            `There was a problem ${action[1]} ${type}: ${id} - ${e.errors.join(' ') || e.message}`
          );
        });
    },
    reloadRecord(model) {
      model.reload();
    },
  },
});
