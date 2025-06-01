<script lang="ts">
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    let {isOpen, children, message} = $props();
</script>

<AlertDialog.Root open={isOpen}>
 <AlertDialog.Content class="w-full max-w-[500px]">
    <AlertDialog.Header>
      <AlertDialog.Title class="w-full items-start flex px-3">{message}</AlertDialog.Title>
    </AlertDialog.Header>
    {@render children()}
  </AlertDialog.Content>
</AlertDialog.Root>