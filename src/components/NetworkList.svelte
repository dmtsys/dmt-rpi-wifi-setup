<script>
  import { createEventDispatcher } from 'svelte';
  import { SearchableList } from 'dmt-frontend-components';
  import ChevronRightIcon from './ChevronRightIcon.svelte';

  const dispatch = createEventDispatcher();

  export let networks = [];
</script>

<SearchableList
  items={networks}
  transparent
  searchPlaceholder="Search networks..."
  searchAutofocus
  noItemsText="No networks found"
  on:selectItem={e => dispatch('selectNetwork', e.detail)}
>
  <div class="item" slot="item" let:item>
    <span>
      {item}
    </span>
    <ChevronRightIcon />
  </div>
</SearchableList>

<style>
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
